import { TestType } from '@common/test';

export interface TestsProps {
    runTest(testType: TestType, count: number): void;
}
