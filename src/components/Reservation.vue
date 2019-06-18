<template>
  <div class="reservation">
    <div class="row">
      <label for="date">Data*</label>

      <div>
        <input
          id="date"
          type="date"
          name="date"
        >
      </div>
    </div>

    <div class="row">
      <label for="shift">Período*</label>

      <select
        id="shift"
        name="shift"
      >
        <option value="1">Manhã</option>
        <option value="2">Tarde</option>
      </select>
    </div>

    <div>
      <button
        type="submit">
        Salvar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reservation',
  data () {
    return {}
  },
  methods: {}
}
</script>
