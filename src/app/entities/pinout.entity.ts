export class PinoutEntity {
    public type: "SCHEDULE" | "SENSOR";
}

export class SchedulePinoutEntity extends PinoutEntity {
    declare public type: "SCHEDULE";
    public valves: number[];
    public times: string[];
}