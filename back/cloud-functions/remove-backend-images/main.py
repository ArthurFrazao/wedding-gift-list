from google.cloud import bigquery

def main(event, context):
    """Triggered by a change to a Cloud Storage bucket.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    file = event
    file_name = file["name"]
    print("filename", file_name)

    file_name_without_ext = file_name.split(".")[0]
    print("filename without extension", file_name_without_ext)

    delete_item_bigquery(file_name_without_ext)

def delete_item_bigquery(file_name_without_ext:str):
    """Delete item information from BigQuery table 'gifts'.

    Parameters:
        file_name_without_ext (str): The name of the item without its file extension.

    Returns:
        None
    """
    bigquery_client = bigquery.Client()
    query = f"DELETE FROM backend.gifts WHERE name in ('{file_name_without_ext}')"
    try:
        bigquery_client.query(query=query)
    except Exception as error:
        print("error:", error)