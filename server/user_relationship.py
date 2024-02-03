import database_util

async def create_relationship(data):
    p1_id = data['p1_id']
    p2_id = data['p2_id']
    type_id = data['type_id']

    query = "INSERT INTO Relationship (p1_id, p2_id, type_id) VALUES (%s, %s, %s)"
    database_util.execute(query, (p1_id, p2_id, type_id))

async def create_relationship_nojson(p1_id, p2_id, type_id):
    query = "INSERT INTO Relationship (p1_id, p2_id, type_id) VALUES (%s, %s, %s)"
    database_util.execute(query, (p1_id, p2_id, type_id))