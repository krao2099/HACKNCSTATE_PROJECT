import database_util

def return_tree():

    tree = {}

    query = "SELECT * FROM Person;"

    persons = database_util.retrieve(query, None)

    query = "SELECT * FROM Relationship;"

    relationships = database_util.retrieve(query, None)

    tree['persons'] = persons

    tree['relationships'] = relationships

    return tree


