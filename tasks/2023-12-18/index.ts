// Tutaj skopiuj kod zadania
interface IRateLimiter {
    maxRequests: number;
    currentRequestNumber: number;
    intervalMs: number;
    allowedRequestInterval: NodeJS.Timeout | null;
    attemptAccess: () => boolean;
}

export class RateLimiter implements IRateLimiter{
    maxRequests: number;
    currentRequestNumber: number = 0;
    intervalMs: number;
    allowedRequestInterval: NodeJS.Timeout | null = null;
    constructor(_maxRequests:number, _intervalMs: number){
        this.maxRequests = _maxRequests;
        this.intervalMs = _intervalMs;
        this.currentRequestNumber = 0;
        this.resetRequests = this.resetRequests.bind(this);
    };

    attemptAccess(): boolean {
        if(this.currentRequestNumber++ > this.maxRequests && this.allowedRequestInterval){
            clearTimeout(this.allowedRequestInterval as NodeJS.Timeout);
            return false;
        }
        if(!this.allowedRequestInterval){
            this.allowedRequestInterval = setTimeout(this.resetRequests, this.intervalMs);
        }
        this.currentRequestNumber++;
        return true;
    }

    resetRequests(): void {
        this.currentRequestNumber = 0;
    }
}