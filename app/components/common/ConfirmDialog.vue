<template>
  <v-dialog
    v-model="isDialogVisible"
    persistent
    min-width="300"
    max-width="400"
  >
    <v-card>
      <v-card-title class="text-h6">
        <slot></slot>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="lime darken-4" text @click="cancel">
          <span class="font-weight-bold"> {{ $t('action.disagree') }}</span>
        </v-btn>
        <v-btn color="green darken-4" text @click="confirm">
          <span class="font-weight-bold"> {{ $t('action.agree') }}</span>
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
        this.$emit('input', false);
      },
    },
  },

  methods: {
    cancel() {
      this.isDialogVisible = false;
    },

    confirm() {
      this.$emit('confirm');
    },
  },
});
</script>
