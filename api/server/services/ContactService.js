import database from '../src/models';

class ContactService {
    static async getAllContacts() {
        try {
            return await database.Contact.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addContact(newContact) {
        try {
            return await database.Contact.create(newContact);
        } catch (error) {
            throw error;
        }
    }

    static async updateContact(id, updateContact) {
        try {
            const contactToUpdate = await database.Contact.findOne({
                where: { id: Number(id) }
            });

            if (contactToUpdate) {
                await database.Contact.update(updateContact, { where: { id: Number(id) } });

                return updateContact;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAContact(id) {
        try {
            const theContact = await database.Contact.findOne({
                where: { id: Number(id) }
            });

            return theContact;
        } catch (error) {
            throw error;
        }
    }

    static async deleteContact(id) {
        try {
            const contactToDelete = await database.Contact.findOne({ where: { id: Number(id) } });

            if (contactToDelete) {
                const deletedContact = await database.Contact.destroy({
                    where: { id: Number(id) }
                });
                return deletedContact;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default ContactService;