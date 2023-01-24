from typing import Any, Dict, List, Union
from google.cloud import bigquery
import os

class BigQueryClass():

    def __init__(self) -> None:
        self.project_id = os.getenv("PROJECT_ID")
        self.dataset_id = os.getenv("DATASET_ID")
        self.client = bigquery.Client()

    def execute_query(self, query:str) -> Union[None, List[Dict[str, Any]]]:
        try:
            job = self.client.query(query)
            results = job.result()
            results_dict = [dict(row) for row in results]
        except Exception as e:
            print(f"Error in executing query: {e}")
            return None
        else:
            return results_dict
