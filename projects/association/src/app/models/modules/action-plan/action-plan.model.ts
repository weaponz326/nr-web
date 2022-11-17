export class ActionPlan {
    account!: string;
    plan_code!: string;
    plan_title!: string;
    description!: string;
    plan_date!: Date;
}

export class PlanStep {
    account!: string;
    stepNumber!: string;
    stepDescription!: string;
}