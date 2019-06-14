import * as _ from 'lodash';

export default class EntityDataResolver {
    private static toEstablishment (data) {
        const payload = _.pick(data, [
            'address',
            'lat',
            'lng',
            'format',
            'chain',
            'channel',
            'state',
            'city'
        ])
        return payload;
    }
    private static toCategory (data) {
        const payload = _.pick(data, [
            'brand'
        ])
        return payload;
    }
    static resolve (data) {
        let payload = {};
        switch(data.entityName) {
            case 'Negocio':
                payload = Object.assign({}, EntityDataResolver.toEstablishment(data));
                break;
            case 'Categoria':
                payload = Object.assign({}, EntityDataResolver.toCategory(data));
                break;
            default:
        }
        return payload;
    }
}