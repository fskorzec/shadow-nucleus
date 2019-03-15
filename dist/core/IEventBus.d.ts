export interface EventBusDelegate {
    (data: any): void;
}
export interface EventBusAutoOff {
    off: () => void;
    id: number;
}
export interface IEventBus {
    on(eventName: string, callback: EventBusDelegate): EventBusAutoOff;
    once(eventName: string, callback: EventBusDelegate): EventBusAutoOff;
    off(): void;
    off(eventName: string): void;
    off(callback: EventBusDelegate): void;
    off(callbackId: number): void;
    off(eventName: string, callback: EventBusDelegate): void;
    emit(eventName: string, data: any): boolean;
    emitAsync(eventName: string, data: any): boolean;
}
//# sourceMappingURL=IEventBus.d.ts.map