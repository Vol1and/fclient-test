<template>
  <div>
    <q-table
        :data="tableData"
        :columns="tableColumns"
        no-results-label="Список ответов пуст"
        binary-state-sort
        :rows-per-page-options="[100]"
        class="answers-table"
    >
      <template v-slot:header-cell="props">
        <q-th class="cursor-pointer" :props="props">
            {{ props.col.label }}
            <q-item-label v-if="filters[props.col.name]">Фильтр: {{filters[props.col.name]}}</q-item-label>
            <q-popup-edit v-model="filters[props.col.name]" auto-save>
              <q-input v-model="filters[props.col.name]" dense autofocus counter />
            </q-popup-edit>
        </q-th>
      </template>
      <template v-slot:header-cell-isValid="props">
        <q-th :props="props">
          <div class="cursor-pointer">
            {{ props.col.label }}
            <q-item-label v-if="filters[props.col.name] !== null">Фильтр: {{filters[props.col.name]}}</q-item-label>
            <q-popup-edit v-model="filters[props.col.name]" auto-save>
              <q-toggle toggle-indeterminate v-model="filters[props.col.name]"  label="Корректность ответа" />
            </q-popup-edit>
          </div>
        </q-th>
      </template>
    </q-table>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {mapActions, mapGetters} from 'vuex';
import {IQuestionAnswer} from '@/interfaces';

@Component({
    methods: {
        ...mapActions({
            getAnswersList: 'getAnswersList',
            updateFilters: 'updateFilters',
        }),
    },
    computed: {
        ...mapGetters({
            filteredAnswers: 'filteredAnswers',
            storedFilters: 'storedFilters',
        }),
    },
})
export default class AnswerList extends Vue {
  protected getAnswersList!: () => any;
  protected updateFilters!: (filters: IQuestionAnswer) => any;
  protected filteredAnswers!: Array<IQuestionAnswer>;
  protected storedFilters!: IQuestionAnswer;

  @Watch('filters', {deep: true})
  private onFiltersChange(value: IQuestionAnswer) {
      this.filters = value;
      this.updateFilters(this.filters);
  }

  private filters: IQuestionAnswer = {
      question_id: '',
      answer_id: '',
      question_type: '',
      answer: '',
      isValid: null,
  };

  private tableColumns = [
      {name: 'question_id', align: 'left', label: 'Id вопроса', field: 'question_id'},
      {name: 'answer_id', align: 'left', label: 'Id ответа', field: 'answer_id'},
      {name: 'question_type', align: 'left', label: 'Тип вопроса', field: 'question_type'},
      {name: 'answer', align: 'left', label: 'Ответ', field: 'answer'},
      {name: 'isValid', align: 'left', label: 'Корректность',
          field: (row: IQuestionAnswer) => row.isValid ? 'Верное': 'Неверно'},
  ];

  mounted() {
      this.getAnswersList();
      if (this.storedFilters) {
          this.filters = this.storedFilters;
      }
  }


  get tableData() {
      return this.filteredAnswers;
  }
}
</script>

