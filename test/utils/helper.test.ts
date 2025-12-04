import {makeId, slugify} from "../../src/utils/helpers";
describe("helpers", () => {
    describe("slugify", () => {
        it("should trim, lowercase, and replace spaces with dashes", () => {
            expect(slugify(" Hello World ")).toBe("hello-world");
        });

        it("should remove accents and replace special characters", () => {
            expect(slugify("canción mañana café")).toBe("cancion-manana-cafe");
        });

        it("should remove invalid characters", () => {
            expect(slugify("hello!@# world*()")).toBe("hello-world");
        });

        it("should collapse multiple spaces and dashes", () => {
            expect(slugify("hello   world  --- test")).toBe("hello-world-test");
        });

        it("should handle empty string", () => {
            expect(slugify("")).toBe("");
        });
    });

    describe("makeId", () => {
    it("should generate a string of the specified length", () => {
        const length = 10;
        const id = makeId(length);
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(length);
    });

    it("should generate unique ids for multiple calls", () => {
        const ids = new Set();
        for (let i = 0; i < 100; i++) {
        ids.add(makeId(8));
        }
        // There should be a high likelihood that all ids are unique
        expect(ids.size).toBe(100);
    });

    it("should return empty string if length is 0", () => {
        expect(makeId(0)).toBe('');
    });
    });
});



