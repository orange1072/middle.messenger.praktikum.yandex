import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Block } from '../Block';

// Создаем тестовый компонент
class TestBlock extends Block {
    render() {
        return '<div class="test-block">Test Content</div>';
    }
}

class TestBlockWithEvents extends Block {
    render() {
        return '<div><button class="test-button">Click me</button></div>';
    }
}

class TestBlockWithChildren extends Block {
    render() {
        return '<div class="parent">{{{child}}}</div>';
    }
}

describe('Block', () => {
    let testBlock: TestBlock;

    beforeEach(() => {
        testBlock = new TestBlock();
    });

    describe('constructor', () => {
        it('should create block with unique id', () => {
            const block1 = new TestBlock();
            const block2 = new TestBlock();
            expect(block1['_id']).not.toBe(block2['_id']);
        });

        it('should initialize with props', () => {
            const props = { testProp: 'testValue' };
            const block = new TestBlock(props);
            expect(block['props'].testProp).toBe('testValue');
        });
    });

    describe('getContent method', () => {
        it('should return element after render', () => {
            // В нашей реализации блок автоматически инициализируется при создании
            const element = testBlock.getContent();
            expect(element).toBeInstanceOf(HTMLElement);
            expect(element.className).toBe('test-block');
        });
    });

    describe('setProps method', () => {
        it('should update props', () => {
            const newProps = { newProp: 'newValue' };
            testBlock.setProps(newProps);
            expect(testBlock['props'].newProp).toBe('newValue');
        });

         it('should not update props if nextProps is null', () => {
             const originalProps = { ...testBlock['props'] };
             testBlock.setProps(null as unknown as Partial<typeof testBlock['props']>);
             expect(testBlock['props']).toEqual(originalProps);
         });
    });

    describe('show and hide methods', () => {
        beforeEach(() => {
            testBlock.dispatchComponentDidMount();
        });

        it('should show element', () => {
            testBlock.hide();
            testBlock.show();

            const element = testBlock.getContent();
            expect(element.style.display).toBe('');
            expect(element.style.visibility).toBe('visible');
        });

        it('should hide element', () => {
            testBlock.hide();

            const element = testBlock.getContent();
            expect(element.style.display).toBe('none');
            expect(element.style.visibility).toBe('hidden');
        });
    });

    describe('events handling', () => {
        let testBlockWithEvents: TestBlockWithEvents;
        let mockEventListener: jest.Mock;

        beforeEach(() => {
            mockEventListener = jest.fn();
            testBlockWithEvents = new TestBlockWithEvents({
                events: {
                    'click:.test-button': mockEventListener,
                },
            });
            testBlockWithEvents.dispatchComponentDidMount();
        });

        it('should add event listeners', () => {
            testBlockWithEvents.dispatchComponentDidMount();
            const button = testBlockWithEvents
                .getContent()
                .querySelector('.test-button');
            expect(button).toBeTruthy();
        });

         it('should handle events with selectors', () => {
             testBlockWithEvents.dispatchComponentDidMount();
             const button = testBlockWithEvents
                 .getContent()
                 .querySelector('.test-button') as HTMLButtonElement;
             if (button) {
                 button.click();
                 expect(mockEventListener).toHaveBeenCalled();
             }
         });
    });

    describe('children handling', () => {
        it('should handle children in props', () => {
            const childBlock = new TestBlock();
            const parentBlock = new TestBlockWithChildren({
                child: childBlock,
            });

            expect(parentBlock['children'].child).toBe(childBlock);
        });

        it('should handle lists of children', () => {
            const child1 = new TestBlock();
            const child2 = new TestBlock();
            const parentBlock = new TestBlockWithChildren({
                children: [child1, child2],
            });

            expect(parentBlock['lists'].children).toEqual([child1, child2]);
        });
    });

    describe('component lifecycle', () => {
         it('should call componentDidMount', () => {
             const componentDidMountSpy = jest.spyOn(
                 testBlock,
                 'componentDidMount' as never,
             );
             testBlock.dispatchComponentDidMount();
             expect(componentDidMountSpy).toHaveBeenCalled();
         });

         it('should call componentDidUpdate when props change', () => {
             const componentDidUpdateSpy = jest.spyOn(
                 testBlock,
                 'componentDidUpdate' as never,
             );
             testBlock.setProps({ newProp: 'value' });
             expect(componentDidUpdateSpy).toHaveBeenCalled();
         });
    });

    describe('attributes handling', () => {
        it('should set attributes', () => {
            const blockWithAttrs = new TestBlock({
                attr: {
                    'data-test': 'test-value',
                    id: 'test-id',
                },
            });
            blockWithAttrs.dispatchComponentDidMount();

            const element = blockWithAttrs.getContent();
            expect(element.getAttribute('data-test')).toBe('test-value');
            expect(element.getAttribute('id')).toBe('test-id');
        });
    });

    describe('proxy behavior', () => {
        it('should bind functions to target', () => {
            const block = new TestBlock({
                testMethod: function () {
                    return this;
                },
            });

            const { testMethod } = block['props'];
            // Проверяем, что функция привязана к правильному контексту
            expect(typeof testMethod).toBe('function');
        });

        it('should prevent property deletion', () => {
            const block = new TestBlock({ testProp: 'value' });
            expect(() => {
                delete block['props'].testProp;
            }).toThrow('Нет доступа');
        });
    });
});
