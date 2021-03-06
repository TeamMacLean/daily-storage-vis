import moment from "moment";

export default function (data) {
    let containers = [];


    function findContainer(path) {
        const found = containers.filter(c => {
            return c.path === path;
        });

        if (found) {
            return found[0]
        } else {
            return null
        }
    }

    data.quotas.forEach(quota => {
        if (quota.container) {

            const myContainer = findContainer(quota.path);
            if (!myContainer) {
                quota.quotas = [];
                containers.push(quota)
            }
        }
    });

    data.quotas.forEach(quota => {
        if (!quota.container) {
            const myContainer = findContainer(quota.path);
            if (myContainer) {


                quota.fullPath = quota.path;
                if (quota.persona) {
                    quota.fullPath = `${quota.path}/${quota.persona.name.split('\\').pop()}`
                }
                quota.shortPath = './';

                if (quota.fullPath.length > myContainer.path.length) {
                    quota.shortPath = quota.fullPath.split(myContainer.path)[1];
                    myContainer.quotas.push(quota)
                }


            } else {
                //make them a container #fakeittillyoumakeit
                quota.quotas = [];
                containers.push(quota);
            }
        }
    });

    containers = containers.map(container => {
        container.quotas = container.quotas.sort(function (a, b) {
            const textA = a.shortPath.toUpperCase();
            const textB = b.shortPath.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        return container
    });

    containers.sort(function (a, b) {
        const textA = a.path.toUpperCase();
        const textB = b.path.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    const dateFull = moment().format('YYYY/MM/DD');
    return {
        date: moment(),
        dateFull: dateFull,
        containers: containers
    }
}