export class UpdatePinoutDto {
    public type: "SCHEDULE" | "SENSOR";
}

export class UpdateSchedulePinoutDto extends UpdatePinoutDto {
    declare public type: "SCHEDULE";
    public valves: number[];
    public times: string[];
}