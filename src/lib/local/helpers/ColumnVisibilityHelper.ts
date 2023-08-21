
import { type Writable, writable, get } from 'svelte/store'


export default class ColumnVisibilityHelper
{
    private element: HTMLElement
    private columns: Writable<{ name: string, index: number, isVisible?: boolean }[]>

    constructor(columns: { name: string, index: number, isVisible?: boolean }[])
    {
        this.set(columns)
    }

    public getColumns()
    {
        return this.columns
    }

    public toggle(name: string)
    {
        if (!this.element) return
        this.columns.update(store => {
            const column = store.find(item => item.name === name)
            if (!column) return store
            column.isVisible = !column.isVisible
            this.element.querySelectorAll(`tr > *:nth-child(${column.index + 1})`).forEach(element => {
                element.classList.toggle('hidden')
            })
            return store
        })

    }

    public bind(element: HTMLElement)
    {
        this.element = element
        this.preset()
    }

    private set(columns: { name: string, index: number, isVisible?: boolean }[])
    {
        this.columns = writable(
            columns.map(({name, index, isVisible}) => {
                return { name, index, isVisible: isVisible === false ? false : true }
            })
        )
    }

    private preset()
    {
        if (!this.element) return
        for (const { isVisible, index } of get(this.columns)) {
            if (isVisible === false) {
                this.element.querySelectorAll(`tr > *:nth-child(${index + 1})`).forEach((element) => {
                    element.classList.add('hidden')
                })
            }
        }
    }
}