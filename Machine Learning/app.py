import uuid
import pandas as pd
import numpy as np
from sqlalchemy import create_engine
import pickle
from datetime import datetime
from sklearn.linear_model import LogisticRegression  # Assurez-vous que c'est bien un modèle de régression logistique
from sklearn.preprocessing import StandardScaler
import joblib

# Connexion à la base de données avec vérification
try:
    engine = create_engine('mysql+pymysql://root:@localhost:3306/fraud_system')
    connection = engine.connect()
    print("Connexion à la base de données réussie.")
except Exception as e:
    print(f"Erreur lors de la connexion à la base de données: {e}")
    raise

# Charger le modèle avec vérification
try:
    # Utilisez joblib pour charger le modèle
    model = joblib.load('fraud_detection_model.pkl')
    if not isinstance(model, LogisticRegression):
        raise TypeError("Le modèle chargé n'est pas un modèle scikit-learn valide.")
    print(f"Modèle chargé avec succès : {type(model)}")
except Exception as e:
    print(f"Erreur lors du chargement du modèle: {e}")
    raise

# Récupérer les transactions depuis la base de données
try:
    transactions_df = pd.read_sql("SELECT * FROM transactions", connection)
    clients_df = pd.read_sql("SELECT * FROM clients", connection)
    print("Données récupérées avec succès.")
except Exception as e:
    print(f"Erreur lors de la récupération des données: {e}")
    raise

# Mapper les types de transactions
transactions_df['transaction_type'] = transactions_df['transaction_type'].map({
    'PAYMENT': 1,
    'DEPOSIT': 2,
    'WITHDRAWAL': 3
})

# Remplir oldbalanceOrg et newbalanceOrig à partir des données clients
transactions_df = transactions_df.merge(clients_df[['account_id', 'balance']], on='account_id', how='left')
transactions_df['oldbalanceOrg'] = transactions_df['balance'] - transactions_df['amount']
transactions_df['newbalanceOrig'] = transactions_df['balance'] + transactions_df['amount']

# Supprimer les lignes avec des NaN
transactions_df.dropna(inplace=True)

# Préparer les données pour la prédiction
features = transactions_df[['transaction_type', 'amount', 'oldbalanceOrg', 'newbalanceOrig']].values

# Utiliser un scaler si vous en avez utilisé un lors de l'entraînement
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)

# Prédiction avec le modèle
try:
    predictions = model.predict(features_scaled)
    print("Prédictions effectuées avec succès.")
except Exception as e:
    print(f"Erreur lors de la prédiction: {e}")
    raise

# Créer un DataFrame pour les alertes
fraud_alerts = pd.DataFrame({
    'alert_id': [str(uuid.uuid4()) for _ in range(len(transactions_df))],
    'transaction_id': transactions_df['transaction_id'],
    'alert_date': [datetime.now() for _ in range(len(transactions_df))],
    'fraud_type': 'WIRE_TRANSFER_FRAUD',
    'status': np.where(predictions == 'Fraud', 'FRAUDULENT', 'ANALYZING'),
    'comments': '-'
})

# Insérer les alertes dans la table fraud_alerts
try:
    fraud_alerts.to_sql('fraud_alerts', connection, if_exists='append', index=False)
    print("Les transactions ont été analysées et les alertes ont été insérées dans la base de données.")
except Exception as e:
    print(f"Erreur lors de l'insertion dans la base de données: {e}")
    raise

# Fermer la connexion à la base de données
finally:
    connection.close()
    print("Connexion à la base de données fermée.")
