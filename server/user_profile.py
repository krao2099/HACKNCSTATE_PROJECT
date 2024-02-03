import database_util


async def create_profile(data):
    name = data['name']
    dob = data['dob']
    bio = data['bio']
    pic = data['pic']
    query = "INSERT INTO Person (name, birthday, bio, profile_picture) VALUES (%s, %s, %s, %s) RETURNING id;"
    id = database_util.execute(query, (name, dob, bio, pic), retrieve=True)
    return id

def view_profile(data):
    id = data['id']

    query = "SELECT * FROM Person WHERE id = %s"

    result = database_util.retrieve(query, (id,))

    person_data = {
        "id": result[0],
        "name": result[1],
        "birthday": result[2],
        "bio": result[3],
        "profile_picture": result[4]
    }

    return person_data

