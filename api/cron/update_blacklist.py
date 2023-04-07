import csv
import requests

# URL of the latest phishing site information
url = "https://raw.githubusercontent.com/mitchellkrogza/Phishing.Database/master/ALL-phishing-domains.tar.gz"

# Download and extract the CSV file
response = requests.get(url)
csv_data = response.content.decode("utf-8").splitlines()
csv_reader = csv.reader(csv_data)

# Open the CSV file to update
filename = "phishing_sites.csv"
with open(filename, mode="a", newline="") as csv_file:
    writer = csv.writer(csv_file)

    # Skip the header row
    next(csv_reader)

    # Write each row to the CSV file
    for row in csv_reader:
        writer.writerow(row)

print("CSV file updated successfully.")
