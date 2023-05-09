export const CustomerService = {
    getData() {
        return [
            { name: 'Afghanistan', code: 'AF' },
            { name: 'Albania', code: 'AL' },
            { name: 'Algeria', code: 'DZ' },
            { name: 'American Samoa', code: 'AS' },
            { name: 'Andorra', code: 'AD' },
            { name: 'Angola', code: 'AO' },
            { name: 'Anguilla', code: 'AI' },
            { name: 'Antarctica', code: 'AQ' },
            { name: 'Antigua and Barbuda', code: 'AG' },
            { name: 'Argentina', code: 'AR' },
            { name: 'Armenia', code: 'AM' },
            { name: 'Aruba', code: 'AW' },
            { name: 'Australia', code: 'AU' },
            { name: 'Austria', code: 'AT' },
            
        ];
//     },

//     getCustomersSmall() {
//         return Promise.resolve(this.getData().slice(0, 10));
//     },

//     getCustomersMedium() {
//         return Promise.resolve(this.getData().slice(0, 50));
//     },

//     getCustomersLarge() {
//         return Promise.resolve(this.getData().slice(0, 200));
//     },

//     getCustomersXLarge() {
//         return Promise.resolve(this.getData());
//     },

//     getCustomers(params) {
//         const queryParams = params
//             ? Object.keys(params)
//                   .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
//                   .join('&')
//             : '';

//         // return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
//         return fetch('http://localhost:8080/api/edital/buscarTodos?' + queryParams).then((res) => res.json());
//     }
// };
    },

    getCountries() {
        return Promise.resolve(this.getData());
    }
};