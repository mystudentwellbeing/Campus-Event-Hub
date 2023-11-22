import db from './dbConnection.js';

class Events {
    constructor(
    event_id,
    name_of_event, 
    type,
    date, 
    start_time,
    end_time, 
    name_of_venue, 
    address, 
    city, 
    postal_code,
    short_description,
    description,
    virtual_link,
    image_url, 
    contact_name,
    contact_email,
    contact_phone, 
    name_organization, 
    price,
    event_link
    ){
        this.event_id = event_id;
        this.name_of_event = name_of_event;
        this.type = type;
        this.date = date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.name_of_venue = name_of_venue; 
        this.address = address;
        this.city = city;
        this.postal_code = postal_code;
        this.short_description = short_description;
        this.description = description;
        this.virtual_link = virtual_link;
        this.image_url = image_url;
        this.contact_name = contact_name;
        this.contact_email = contact_email;
        this.contact_phone = contact_phone;
        this.name_organization = name_organization;
        this.price = price;
        this.event_link = event_link;
    }

    static async findById(event_id) {
        const row = await db.getrow("SELECT * FROM events WHERE event_id=?", [event_id]);
        if(row){
            return new Events(...Object.values(row));
        }
        return null;
    }

    async save() {
        const result = await db.query(
            'INSERT INTO events (name_of_event, type, date, start_time, end_time, name_of_venue, address, city, postal_code, short_description, description, virtual_link, image_url, contact_name, contact_email, contact_phone, name_organization, price, event_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                this.name_of_event,
                this.type,
                this.date,
                this.start_time,
                this.end_time,
                this.name_of_venue,
                this.address,
                this.city,
                this.postal_code,
                this.short_description,
                this.description,
                this.virtual_link,
                this.image_url,
                this.contact_name,
                this.contact_email,
                this.contact_phone,
                this.name_organization,
                this.price,
                this.event_link
            ]
        );
        this.event_id = result.insertId;
    }
}

export default Events;