from google.cloud import storage, bigquery

def main(event, context):
    """Triggered by a change to a Cloud Storage bucket.
    Parameters:
        event (dict): Event payload.
        context (google.cloud.functions.Context): Metadata for the event.

    Returns:
        None
    """
    file = event
    file_name = file["name"]
    print("filename", file_name)

    file_name_without_ext = file_name.split(".")[0]
    print("filename without extension", file_name_without_ext)

    bucket_name = file["bucket"]
    obj_public_url = make_blob_public(bucket_name, file_name)

    insert_item_bigquery(file_name_without_ext, obj_public_url)


def make_blob_public(bucket_name:str, blob_name:str) -> str:
    """Make a Cloud Storage object public by editing its metadata access
    Parameters:
        bucket_name (str): Name of the bucket that contains the object
        blob_name (str): Name of the object

    Returns:
        str: Public URL of the object
    """
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    blob.make_public()
    print(
        f"Blob {blob.name} is publicly accessible at {blob.public_url}"
    )

    return blob.public_url


def insert_item_bigquery(file_name_without_ext:str, obj_public_url:str):
    """Insert item information into BigQuery table 'gifts'.

    The function merges the 'gifts' table with a select statement that generates new item information, with:
    - 'id' being the max value in the 'gifts' table plus 1,
    - 'name' being the input 'file_name_without_ext',
    - 'image_url' being the input 'obj_public_url',
    - 'is_presented' being False.
    If the 'name' of the item already exists in the 'gifts' table, the row will not be inserted.

    Parameters:
        file_name_without_ext (str): The name of the item without its file extension.
        obj_public_url (str): The public URL of the item's image.

    Returns:
        None
    """
    bigquery_client = bigquery.Client()
    query = f"""
    MERGE
        backend.gifts as T
    USING
    (
    SELECT
        MAX(id)+1 as id,
        '{file_name_without_ext}' as name,
        '{obj_public_url}' as image_url,
        {False} as is_presented
    FROM
    backend.gifts
    ) as S
    ON T.name = S.name
    WHEN NOT MATCHED THEN
    INSERT ROW
    """
    try:
        bigquery_client.query(query=query)
    except Exception as error:
        print("error:", error)