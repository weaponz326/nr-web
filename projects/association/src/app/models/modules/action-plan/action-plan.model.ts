export class ActionPlan {
    account!: string;
    plan_code!: string;
    plan_title!: string;
    description!: string;
    plan_date!: Date;
}

export class PlanStep {
    action_plan!: string;
    step_number!: string;
    step_description!: string;
}