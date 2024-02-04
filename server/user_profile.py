import database_util


def create_profile(data):
    name = data['name']
    dob = data['dob']
    bio = data['bio']
    pic = data['pic']
    gender = data['gender']
    query = "INSERT INTO Person (name, birthday, bio, profile_picture, gender) VALUES (%s, %s, %s, %s, %s) RETURNING id;"
    id = database_util.execute(query, (name, dob, bio, pic, gender), retrieve=True)
    return id

def view_profile(id):
    query = "SELECT * FROM Person WHERE id = %s"

    result = database_util.retrieve(query, (id,))[0]

    person_data = {
        "id": result[0],
        "name": result[1],
        "birthday": result[2],
        "bio": result[3],
        "profile_picture": result[4],
        "gender": result[5]
    }

    return person_data

def view_all_profile():
    response = {}
    response['profiles'] = []
    query = "SELECT id, name FROM Person"
    data = database_util.retrieve(query, None)
    for profile in data:
        response['profiles'].append({'id':profile[0], 'name':profile[1]})
    return response
