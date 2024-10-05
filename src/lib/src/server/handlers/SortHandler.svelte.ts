import type { TableHandler } from '$lib/src/server'

export default class SortHandler<Row>
{
    private table: TableHandler

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(field: string)
    {
        const sort = this.table['sort']

        if(!sort || sort.field !== field) {
            this.asc(field)
        }
        else if (sort.direction === 'asc') {
            this.desc(field)
        }
        else if (sort.direction === 'desc') {
            this.asc(field)
        }
    }

    public asc(field: string)
    {
        this.table['sort'] = { field, direction: 'asc' }
        this.table.setPage(1)
        this.table['event'].dispatch('change')
    }

    public desc(field: string)
    {
        this.table['sort'] = { field, direction: 'desc' }
        this.table.setPage(1)
        this.table['event'].dispatch('change')
    }
}
