import { RefObject, useEffect } from 'react';
import * as d3 from 'd3';
import { VIEW_BOX_PADDING, VIEW_BOX_RIGHT_PADDING, X_AXIS_PADDING, Y_AXIS_PADDING } from './metrics.contants';
import { useAxisStyles } from './metrics.styles';

export const useAxisX = (svgRef: RefObject<SVGSVGElement>, values: number[]): void => {
    const classes = useAxisStyles();

    useEffect(() => {
        if (svgRef.current && values.length) {
            const svgWidth = svgRef.current.clientWidth;
            const svgHeight = svgRef.current.clientHeight;

            const svg = d3.select(svgRef.current);

            const x = d3
                .scaleBand<number>()
                .domain(values)
                .range([svgWidth - VIEW_BOX_RIGHT_PADDING, X_AXIS_PADDING]);

            svg.append('g')
                .attr('class', classes.axisX)
                .attr('transform', `translate(0,${svgHeight - Y_AXIS_PADDING})`)
                .call(d3.axisBottom(x));
        }
    }, [svgRef, values, classes]);
};

export const useAxisY = (svgRef: RefObject<SVGSVGElement>, values: number[]): void => {
    useEffect(() => {
        if (svgRef.current && values.length) {
            const svgHeight = svgRef.current.clientHeight;

            const svg = d3.select(svgRef.current);

            const minValue = Math.min(...values);
            const maxValue = Math.max(...values);

            const min = minValue - minValue * VIEW_BOX_PADDING;
            const max = maxValue + maxValue * VIEW_BOX_PADDING;

            const y = d3
                .scaleLinear()
                .domain([min, max])
                .range([svgHeight - Y_AXIS_PADDING, 0]);

            svg.append('g').attr('transform', `translate(${X_AXIS_PADDING},0)`).call(d3.axisLeft(y));
        }
    }, [svgRef, values]);
};

export const useGrid = (svgRef: RefObject<SVGSVGElement>, values: number[]): void => {
    useEffect(() => {
        if (svgRef.current && values.length) {
            const svgHeight = svgRef.current.clientHeight;
            const svgWidth = svgRef.current.clientWidth;

            const svg = d3.select(svgRef.current);

            const minValue = Math.min(...values);
            const maxValue = Math.max(...values);

            const min = minValue - minValue * VIEW_BOX_PADDING;
            const max = maxValue + maxValue * VIEW_BOX_PADDING;

            let step = 5;
            let delta = 2;

            while (((svgHeight - Y_AXIS_PADDING) / (max - min)) * step < 70) {
                step *= delta;
                delta = delta === 2 ? 5 : 2;
            }

            const minLine = min - (min % step) + step;
            const maxLine = max - (max % step);

            const lines = [maxLine];

            while (lines[lines.length - 1] !== minLine) {
                lines.push(lines[lines.length - 1] - step);
            }

            const x = d3
                .scaleLinear<number>()
                .domain([0, values.length - 1])
                .range([svgWidth - VIEW_BOX_RIGHT_PADDING, X_AXIS_PADDING]);

            const y = d3
                .scaleLinear()
                .domain([min, max])
                .range([svgHeight - Y_AXIS_PADDING, 0]);

            svg.append('g')
                .selectAll('g')
                .data(values)
                .join('line')
                .attr('stroke', 'darkgrey')
                .attr('x1', (_, index) => x(index))
                .attr('y1', 0)
                .attr('x2', (_, index) => x(index))
                .attr('y2', svgHeight - Y_AXIS_PADDING);

            svg.append('g')
                .selectAll('g')
                .data(lines)
                .join('line')
                .attr('stroke', 'darkgrey')
                .attr('x1', X_AXIS_PADDING)
                .attr('y1', (value) => y(value) + 0.5)
                .attr('x2', svgWidth - VIEW_BOX_RIGHT_PADDING)
                .attr('y2', (value) => y(value) + 0.5);
        }
    }, [svgRef, values]);
};
