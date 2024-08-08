import pandas as pd
import re

# Load the CSV file
file_path = 'Checking1.csv'
df = pd.read_csv(file_path, header=None)

relevant_columns = df[[0, 1, 4]]
relevant_columns.columns = ['Date', 'Amount', 'Description']

# Function to normalize descriptions (remove dates, transaction IDs, etc.)
def normalize_description(desc):
    desc = re.sub(r'\d{2}/\d{2}', '', desc)
    desc = re.sub(r'\d+', '', desc)
    desc = re.sub(r'PURCHASE AUTHORIZED ON', '', desc, flags=re.IGNORECASE)
    return desc.strip()

relevant_columns['Normalized_Description'] = relevant_columns['Description'].apply(normalize_description)
recurring_payments = relevant_columns.groupby('Normalized_Description').agg(
    Counts=('Normalized_Description', 'size'),
    Total_Amount=('Amount', 'sum')
).reset_index()
recurring_payments = recurring_payments[recurring_payments['Counts'] > 1]
recurring_payments = recurring_payments.sort_values(by='Total_Amount')

print(recurring_payments)
