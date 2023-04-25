import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import AutomobileVO

def poll(test_poll=True):
    while True:
        print('Service poller polling for data')
        try:
            response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles")
            content = json.loads(response.content)
            for autom in content["autos"]:
                AutomobileVO.objects.update_or_create(
                    vin=autom["vin"],
                )
        except Exception as e:
            print(e, file=sys.stderr)

        if test_poll == False:
            break
        time.sleep(60)


if __name__ == "__main__":
    poll()
