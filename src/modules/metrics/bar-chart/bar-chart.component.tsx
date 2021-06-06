import React, { memo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useStyles } from './bar-chart.styles';
import { BarChartProps } from './bar-chart.types';
import { useAxisX, useAxisY, useGrid } from '../metrics.hooks';
import { VIEW_BOX_PADDING, VIEW_BOX_RIGHT_PADDING, X_AXIS_PADDING, Y_AXIS_PADDING } from '../metrics.contants';

export const BarChart = memo(({ values }: BarChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const classes = useStyles({});

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
    }, [values]);

    useAxisX(svgRef, values);
    useAxisY(svgRef, values);
    useGrid(svgRef, values);

    useEffect(() => {
        if (svgRef.current) {
            const svgWidth = svgRef.current.clientWidth;
            const svgHeight = svgRef.current.clientHeight;

            const minValue = Math.min(...values);
            const maxValue = Math.max(...values);

            const min = minValue - minValue * VIEW_BOX_PADDING;
            const max = maxValue + maxValue * VIEW_BOX_PADDING;

            const x = d3
                .scaleBand<number>()
                .domain(values)
                .range([svgWidth - VIEW_BOX_RIGHT_PADDING, X_AXIS_PADDING])
                .padding(0.1);

            const y = d3
                .scaleLinear()
                .domain([min, max])
                .range([svgHeight - Y_AXIS_PADDING, 0]);

            const svg = d3.select(svgRef.current);

            svg.attr('viewBox', ([0, 0, svgWidth, svgHeight] as unknown) as number);

            svg.append('g')
                .attr('fill', 'steelblue')
                .selectAll('g')
                .data(values)
                .join('rect')
                .attr('class', classes.bar)
                .attr('x', (value) => x(value) as number)
                .attr('y', (value) => y(value))
                .attr('height', (value) => svgHeight - y(value) - Y_AXIS_PADDING)
                .attr('width', x.bandwidth());
        }
    }, [values, classes]);

    return <svg className={classes.root} ref={svgRef} />;
});
