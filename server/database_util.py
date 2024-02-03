import psycopg2

def connect_db():
    return psycopg2.connect(host="db",dbname="family_tree", user="postgres", password="password")

def execute(query, params, retrieve=False):
    return_val = None
    with connect_db() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            if retrieve:
                temp = cursor.fetchone()
                return_val = temp[0]
        conn.commit()
    return return_val

def retrieve(query, params):
    result = None
    with connect_db() as conn:
        with conn.cursor() as cursor:
            if params == None:
                cursor.execute(query)
            else:
                cursor.execute(query, params)
            result = cursor.fetchall()
        conn.commit()
    return result