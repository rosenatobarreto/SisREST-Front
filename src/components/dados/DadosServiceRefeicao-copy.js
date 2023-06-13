export const DadosServiceRefeicao = {
    // getTreeDiasData() {
    //     return [
    //         {
    //             key: '0',
    //             label: 'Documents',
    //             data: 'Documents Folder',
    //             icon: 'pi pi-fw pi-inbox',
    //             children: [
    //                 {
    //                     key: '0-0',
    //                     label: 'Work',
    //                     data: 'Work Folder',
    //                     icon: 'pi pi-fw pi-cog',
    //                     children: [
    //                         { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
    //                         { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
    //                     ]
    //                 },
    //                 {
    //                     key: '0-1',
    //                     label: 'Home',
    //                     data: 'Home Folder',
    //                     icon: 'pi pi-fw pi-home',
    //                     children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
    //                 }
    //             ]
    //         },
    //         {
    //             key: '1',
    //             label: 'Events',
    //             data: 'Events Folder',
    //             icon: 'pi pi-fw pi-calendar',
    //             children: [
    //                 { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
    //                 { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
    //                 { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
    //             ]
    //         },
    //         {
    //             key: '2',
    //             label: 'Movies',
    //             data: 'Movies Folder',
    //             icon: 'pi pi-fw pi-star-fill',
    //             children: [
    //                 {
    //                     key: '2-0',
    //                     icon: 'pi pi-fw pi-star-fill',
    //                     label: 'Al Pacino',
    //                     data: 'Pacino Movies',
    //                     children: [
    //                         { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
    //                         { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
    //                     ]
    //                 },
    //                 {
    //                     key: '2-1',
    //                     label: 'Robert De Niro',
    //                     icon: 'pi pi-fw pi-star-fill',
    //                     data: 'De Niro Movies',
    //                     children: [
    //                         { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
    //                         { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ];
    // },

    getTreeTableDias() {
        return [
            {
                key: '0',
                data: {
                    name: 'SEGUNDA',
                },
                children: [
                    {
                        key: '0-0',
                        data: {
                            name: 'CAFE_MANHA',
                        },
                    },
                    {
                        key: '0-1',
                        data: {
                            name: 'LANCHE_MANHA',
                        }
                    },
                    {
                        key: '0-2',
                        data: {
                            name: 'ALMOCO',
                        }
                    },
                    {
                        key: '0-3',
                        data: {
                            name: 'LANCHE_TARDE',
                        }
                    },
                    {
                        key: '0-4',
                        data: {
                            name: 'JANTA',
                        }
                    },
                    {
                        key: '0-5',
                        data: {
                            name: 'CEIA',
                        }
                    },
                ]
            },
            {
                key: '1',
                data: {
                    name: 'TERCA',
                },
                children: [
                    {
                        key: '1-0',
                        data: {
                            name: 'CAFE_MANHA',
                        },
                    },
                    {
                        key: '1-1',
                        data: {
                            name: 'LANCHE_MANHA',
                        }
                    },
                    {
                        key: '1-2',
                        data: {
                            name: 'ALMOCO',
                        }
                    },
                    {
                        key: '1-3',
                        data: {
                            name: 'LANCHE_TARDE',
                        }
                    },
                    {
                        key: '1-4',
                        data: {
                            name: 'JANTA',
                        }
                    },
                    {
                        key: '1-5',
                        data: {
                            name: 'CEIA',
                        }
                    },
                ]
            },
            {
                key: '2',
                data: {
                    name: 'QUARTA',
                },
                children: [
                    {
                        key: '2-0',
                        data: {
                            name: 'CAFE_MANHA',
                        },
                    },
                    {
                        key: '2-1',
                        data: {
                            name: 'LANCHE_MANHA',
                        }
                    },
                    {
                        key: '2-2',
                        data: {
                            name: 'ALMOCO',
                        }
                    },
                    {
                        key: '2-3',
                        data: {
                            name: 'LANCHE_TARDE',
                        }
                    },
                    {
                        key: '2-4',
                        data: {
                            name: 'JANTA',
                        }
                    },
                    {
                        key: '2-5',
                        data: {
                            name: 'CEIA',
                        }
                    },
                ]
            },
            {
                key: '3',
                data: {
                    name: 'QUINTA',
                },
                children: [
                    {
                        key: '3-0',
                        data: {
                            name: 'CAFE_MANHA',
                        },
                    },
                    {
                        key: '3-1',
                        data: {
                            name: 'LANCHE_MANHA',
                        }
                    },
                    {
                        key: '3-2',
                        data: {
                            name: 'ALMOCO',
                        }
                    },
                    {
                        key: '3-3',
                        data: {
                            name: 'LANCHE_TARDE',
                        }
                    },
                    {
                        key: '3-4',
                        data: {
                            name: 'JANTA',
                        }
                    },
                    {
                        key: '3-5',
                        data: {
                            name: 'CEIA',
                        }
                    },
                ]
            },
            {
                key: '4',
                data: {
                    name: 'SEXTA',
                },
                children: [
                    {
                        key: '4-0',
                        data: {
                            name: 'CAFE_MANHA',
                        },
                    },
                    {
                        key: '4-1',
                        data: {
                            name: 'LANCHE_MANHA',
                        }
                    },
                    {
                        key: '4-2',
                        data: {
                            name: 'ALMOCO',
                        }
                    },
                    {
                        key: '4-3',
                        data: {
                            name: 'LANCHE_TARDE',
                        }
                    },
                    {
                        key: '4-4',
                        data: {
                            name: 'JANTA',
                        }
                    },
                    {
                        key: '4-5',
                        data: {
                            name: 'CEIA',
                        }
                    },
                ]
            },
            {
                key: '5',
                data: {
                    name: 'SABADO',
                },
                children: [
                    {
                        key: '5-0',
                        data: {
                            name: 'CAFE_MANHA',
                        },
                    },
                    {
                        key: '5-1',
                        data: {
                            name: 'LANCHE_MANHA',
                        }
                    },
                    {
                        key: '5-2',
                        data: {
                            name: 'ALMOCO',
                        }
                    },
                    {
                        key: '5-3',
                        data: {
                            name: 'LANCHE_TARDE',
                        }
                    },
                    {
                        key: '5-4',
                        data: {
                            name: 'JANTA',
                        }
                    },
                    {
                        key: '5-5',
                        data: {
                            name: 'CEIA',
                        }
                    },
                ]
            },
            {
                key: '6',
                data: {
                    name: 'DOMINGO',
                },
                children: [
                    {
                        key: '6-0',
                        data: {
                            name: 'CAFE_MANHA',
                        },
                    },
                    {
                        key: '6-1',
                        data: {
                            name: 'LANCHE_MANHA',
                        }
                    },
                    {
                        key: '6-2',
                        data: {
                            name: 'ALMOCO',
                        }
                    },
                    {
                        key: '6-3',
                        data: {
                            name: 'LANCHE_TARDE',
                        }
                    },
                    {
                        key: '6-4',
                        data: {
                            name: 'JANTA',
                        }
                    },
                    {
                        key: '6-5',
                        data: {
                            name: 'CEIA',
                        }
                    },
                ]
            },
        ];
    },

    getTreeTableDiasData() {
        return Promise.resolve(this.getTreeTableDias());
    },

    getTreeDias() {
        return Promise.resolve(this.getTreeDiasData());
    }
};
