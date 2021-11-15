export interface IQuestionAnswer {
    answer_id: string,
    question_id: string,
    question_type: string,
    answer: string,
    isValid: boolean | null,
    [state: string]: any
}
