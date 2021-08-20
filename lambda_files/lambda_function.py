import boto3
import os
import json

print('Loading function')

def lambda_handler(event, context):
	s3 = boto3.resource('s3')

	view_parts = {}
	
	view_item_names = [
		'body.html'
	]

	status = event['key1'] 
    #simulate pulling a list of content from a database

	for item in view_item_names:
		with open('views/' + item, encoding='utf8') as file:
			view_parts[item] = file.read()

	for item in status:
		html = view_parts['body.html'].format(
			status = event['key1'] 
		)

		s3.Bucket(os.environ['BUCKET_NAME']).put_object(
			Key='index.html',
			Body=(str.encode(html)),
			ContentType='text/html',
			ACL='public-read'
		)