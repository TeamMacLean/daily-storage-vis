export default function UsageGraph(quota) {

    let color = 'primary';
    let percent = 0;


    let logical = quota.usage.logical || 0;
    let physical = quota.usage.physical || 0;

    let current = logical || 0;


    //TODO if overheads false: logical

    let advisory = quota.thresholds.advisory;
    let soft = quota.thresholds.soft || Number.POSITIVE_INFINITY;
    let hard = quota.thresholds.hard || Number.POSITIVE_INFINITY;

    let max = advisory || hard || soft;


    // console.log(quota.persona, current, soft, hard);
    if (max && current) {

        percent = current * 100 / max;

        if (percent >= 80) {
            color = 'warning'
        }
        if (percent >= 95 || current >= soft || quota.thresholds.advisory_exceeded || quota.thresholds.hard_exceeded) {
            color = 'danger'
        }
    }


    return (
        <span style={{marginLeft: 20 + "px", width: 100 + "px", display: "inline-block"}}>
            <progress className={"progress is-" + color} value={percent} max={100}/>
        </span>
    )
}