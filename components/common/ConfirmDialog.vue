<template>
  <v-dialog v-model="isDialogVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h6">
        <v-slot></v-slot>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="yellow darken-1" text @click="cancel">
          {{ $t('action/disagree') }}
        </v-btn>
        <v-btn color="green darken-1" text @click="confirm">
          {{ $t('action/agree') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ConfirmDialog',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    isDialogVisible: {
      get() {
        return this.value;
      },
      set() {
        this.cancel();
      },
    },
  },

  methods: {
    cancel() {
      this.$emit('close');
    },

    confirm() {
      this.$emit('confirm');
    },
  },
});
</script>
