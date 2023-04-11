<template>
  <section id="availableTutors" class="d-flex flex-column align-center">
    <h2 v-if="!thereAreTutors">{{ $t('tutor.list.noAvailable') }}</h2>
    <v-list v-else flat>
      <v-list-item-group v-model="selectedTutorId" color="indigo">
        <v-list-item
          v-for="{ fullName, id } of tutorList"
          :key="`tutor-${id}`"
          :value="id"
          selectable
          mandatory
          class="border-transparent"
          active-class="border-selected"
        >
          <!-- <v-list-item-avatar
                ><v-icon>mdi-account</v-icon>
              </v-list-item-avatar> -->
          {{ fullName }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Role } from '@prisma/client';
import { capitalize } from 'lodash';
import { UserList } from '@/types/api/manage';

export default Vue.extend({
  name: 'AvailableTutors',

  inject: ['showSnackbar'],

  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      tutors: [] as UserList,
    };
  },

  computed: {
    selectedTutorId: {
      get(): number | null {
        return this.value;
      },
      set(id: number) {
        this.$emit('select-tutor', id);
      },
    },

    tutorList() {
      return this.tutors.map(({ firstName, lastName, id }) => ({
        id,
        fullName: `${capitalize(firstName)} ${capitalize(lastName)}`,
      }));
    },

    thereAreTutors(): boolean {
      if (this.isLoading) {
        // during the loading don't show any notification
        return true;
      }
      return Boolean(this.tutorList.length);
    },
  },

  async mounted() {
    await this.fetchTutors();
  },

  methods: {
    selectTutor() {
      this.$emit('select-tutor');
    },

    async fetchTutors() {
      this.$emit('set-loading', true);
      try {
        const { isSuccess, list, message } = await this.$api(
          'manage/users/fetch',
          {
            roleName: Role.TUTOR,
          }
        );

        const isWarn = isSuccess && Boolean(message);
        if (!isSuccess || isWarn) {
          this.showSnackbar({
            isSuccess,
            message,
            isWarn,
          });
        }
        this.tutors = list ?? [];
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        this.$emit('set-loading', false);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
// the same width in order to keep place for the selected
$selected-border-width: 0.5px;

.border-transparent {
  border: solid $selected-border-width;
  border-color: rgba($color: #000000, $alpha: 0);
}

.border-selected {
  border: $app-bar-color dashed $selected-border-width;
  box-sizing: border-box;
}
</style>
