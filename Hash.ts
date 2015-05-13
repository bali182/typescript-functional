class Hash {
    private static LOOKUP : { [id: string]: Function; }  = {
        "string": Hash.hashString,
        'number': Hash.hashNumber,
        'boolean': Hash.hashBoolean,
        'object': Hash.hashObject
    };

    private static hashString(input: string): number {
        var str = input.toString(), hash = 0, i
        for (i = 0; i < input.length; i++) {
            hash = (((hash << 5) - hash) + input.charCodeAt(i)) & 0xFFFFFFFF
        }
        return hash
    }

    private static hashNumber(input: number): number {
        return input;
    }

    private static hashBoolean(input: boolean): number {
        return input ? 1 : 0;
    }

    private static hashObject(input: Object): number {
        var result = 0;
        for (var property in input) {
            if (input.hasOwnProperty(property)) {
                result += Hash.hashString(property) + Hash.hashAny(input[property])
            }
        }

        return result;
    }

    private static hashAny(input: any): number {
        var type = typeof input;
        return input != null && Hash.LOOKUP[type]
            ? Hash.LOOKUP[type](input) + Hash.hashString(type)
            : 0;
    }

    public static toStringHash(): (any) => number {
        return input => input == null || input == undefined 
            ? 0 
            : Hash.hashString(input.toString())
    }

    public static defaultHash() : (any) => number {
        return input => Hash.hashAny(input)
    }
} 