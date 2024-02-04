import database_util

def return_tree():
    tree = {}
    tree['persons'] = []
    tree['relationships'] = []

    query = "SELECT id,name,birthday,profile_picture,gender FROM Person;"

    persons = database_util.retrieve(query, None)

    for person in persons:

        data = {
            'key': person[0],
            'name': person[1],
            'birthday': person[2],
            'picture': person[3],
            'gender': person[4],
        }

        tree['persons'].append(data)

    query = "Select * FROM Relationship;"

    relations = database_util.retrieve(query, None)

    for relation in relations:

        data = {
            'key': (int(relation[0]) * -1),
            'to': relation[1],
            'from': relation[2],
            'type': relation[3],
        }

        tree['relationships'].append(data)
    
    return tree


