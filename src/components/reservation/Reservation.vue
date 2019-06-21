<template>
  <div class="reservation">
    <div v-if="!loading" class="loader">
      <double-bounce background="royalblue"></double-bounce>
    </div>
    <div v-if="loading">
      <div class="form-check">
        <b>Selecione uma Data*:</b><br>
        <ul class="days-reservation">
          <li v-if="dates.length > 0"
              v-for="(date, index) in dates"
              :key="index">
            <input class="form-check-input" type="radio" :name="index" :id="index" :value="date.value" v-model="day">
            <label class="form-check-label" :for="index">
              {{date.label}}
            </label>
            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
        </ul>
      </div>
      <br>
      <div class="form-check">
        <b><label for="period">Período*</label></b>
        <select class="form-control period" ref="period" id="period" v-model="period">
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
        </select>
      </div>
      <br>
      <div class="form-check">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalConfirmation">
          Confirmar
        </button>
        <div class="modal fade" id="modalConfirmation" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Você confirma sua reserva para o dia {{day}}?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal">Cancelar
                </button>
                <button
                  class="btn btn-primary"
                  @click="saveReservation()"
                  data-dismiss="modal"
                  type="submit">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
        <br>
      </div>
      <br>
    </div>
  </div>
</template>

<script src="./reservation.js"></script>

<style src="./reservation.css" scoped></style>
