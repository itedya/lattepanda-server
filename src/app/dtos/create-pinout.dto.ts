
export class CreatePinoutDto {
    public type: "SCHEDULE" | "SENSOR";
}

export class CreateSchedulePinoutDto extends CreatePinoutDto {
    declare public type: "SCHEDULE";
    public valves: number[];
    public times: string[];
}