export class ActionPlan {
    account!: string;
    plan_code!: string;
    plan_title!: string;
    description!: string;
    plan_date!: Date;
}

export class PlanStep {
    action_plan!: string;
    stepNumber!: string;
    stepDescription!: string;
}