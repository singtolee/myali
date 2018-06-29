import { PayLoad2 } from '../tools/pay-load2'

export class LoadPrd {
    static readonly type = '[PRD] Load'
    constructor(public payload:PayLoad2){}
}

export class LoadMore {
    static readonly type = '[PRD] More'
    constructor(public payload:PayLoad2){}
}