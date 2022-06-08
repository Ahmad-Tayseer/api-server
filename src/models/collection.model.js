'use strict'; 

class Collection {
    constructor(model) {
        this.model = model;
    }

    async create(obj) {
        try {
            let newRecord = await this.model.create(obj);
            return newRecord;
        } catch (error) {
            console.log('error in creating new record', this.model);
        }
    }

    async read(data_id) {
        try {
            let record = null;
            if (data_id) {
                record = await this.model.findOne({ where: { id: data_id } });
                return record;
            } else {
                record = await this.model.findAll();
                return record;
            }
        } catch (error) {
            console.log('error in reading record', this.model);
        }
    }

    async update(data_id, obj) {
        try {
            let foundRecord = await this.model.findOne({ where: { id: data_id } });
            let updatedRecord = await foundRecord.update(obj);
            return updatedRecord;
        } catch (error) {
            console.log('error in updating specific record', this.model);
        }
    }

    async delete(data_id) {
        if (!data_id) {
            throw new Error ('no id provided', this.model)
        } else {
            try {
                let deletedRecord = await this.model.destroy({ where: { id: data_id } });
                return "record deleted";
            } catch (error) {
                console.log('error in deleting specific record', this.model);
            }
        } 
    }
}

module.exports = Collection;