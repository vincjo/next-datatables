<script>
    import { loading } from 'gros/loading'


    const generate = async (mode) => {
        loading.start('Generating files from AST')
        const response = await fetch(`http://localhost:3333/document/generate?mode=${mode}`)
        await response.json()
        loading.stop()
    }
</script>

<section class="flex">
    <button onclick={() => generate('client')}>Create files for <b>client</b></button>
    <button onclick={() => generate('server')}>Create files for <b>server</b></button>
</section>

<style>
    section {
        justify-content: center;
        padding: 24px;
        flex-wrap: wrap;
    }
    button {
        background: var(--ternary);
        color: var(--font);
        font-family: JetBrains;
        margin: 8px;
        border-radius: 8px;
        padding: 16px;
        font-size: 18px;
    }
</style>