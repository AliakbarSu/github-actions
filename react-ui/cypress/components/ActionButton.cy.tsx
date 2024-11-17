import ActionButton from '../../src/components/projects/ActionButton';
import '../support/commands.ts';

describe('<ActionButton />', () => {
    it('mounts', () => {
        cy.mount(<ActionButton text="View Projects" onClick={() => null} icon={null} />);
        cy.compareSnapshot('ActionButton-screenshot', { errorThreshold: 0.2 });
    });
});
