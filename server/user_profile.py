import database_util


async def create_profile(data):
    name = data['name']
    dob = data['dob']
    bio = data['bio']
    pic = data['pic']
    query = "INSERT INTO Person (name, birthday, bio, profile_picture) VALUES (%s, %s, %s, %s) RETURNING id;"
    id = database_util.execute(query, (name, dob, bio, pic), retrieve=True)
    return id

