import db from './dbConnection.js';

class User {
    constructor(user_id ,
        email,
        password ,
        created_at ,
        updated_at,
        deleted_at ,
        is_active ,
        is_admin ,
        session_uuid){
            this.user_id=user_id;
            this.email=email;
            this.password=password;
            this.created_at=created_at;
            this.updated_at=updated_at;
            this.deleted_at=deleted_at;
            this.is_active=is_active;
            this.is_admin=is_admin;
            this.session_uuid=session_uuid;
        }


static async findById(user_id) {
    const row = await db.getrow("SELECT * FROM users WHERE user_id=?", [user_id]);
    if(row){
        return new User(...Object.values(row));
    }
    return null;
}}

export default User;
