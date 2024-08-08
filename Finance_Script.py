import pandas as pd
import re

# Load the CSV file
file_path = 'Checking1.csv'
df = pd.read_csv(file_path, header=None)

# Select columns 1, 2, and 5 (adjusting for zero-indexing in Python)
relevant_columns = df[[0, 1, 4]]

# Rename the columns for clarity
relevant_columns.columns = ['Date', 'Amount', 'Description']

# Function to normalize descriptions (remove dates, transaction IDs, etc.)
def normalize_description(desc):
    # Remove dates in the format MM/DD/YYYY or similar
    desc = re.sub(r'\d{2}/\d{2}/\d{4}', '', desc)
    
    # Remove any sequence of digits (e.g., transaction IDs)
    desc = re.sub(r'\d+', '', desc)
    
    # Optionally, remove common words or phrases (like "PURCHASE AUTHORIZED ON")
    desc = re.sub(r'PURCHASE AUTHORIZED ON', '', desc, flags=re.IGNORECASE)
    
    # Strip any extra whitespace
    return desc.strip()

# Apply the normalization function to the Description column
relevant_columns['Normalized_Description'] = relevant_columns['Description'].apply(normalize_description)

# Group by the normalized descriptions and count occurrences
recurring_payments = relevant_columns.groupby('Normalized_Description').size().reset_index(name='Counts')

# Filter out entries that occur more than once
recurring_payments = recurring_payments[recurring_payments['Counts'] > 1]

# Display the recurring payments
print(recurring_payments)
