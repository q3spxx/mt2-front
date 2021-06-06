import React, { memo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useStyles } from './line-chart.styles';
import { LineChartProps } from './line-chart.types';
import { VIEW_BOX_PADDING, VIEW_BOX_RIGHT_PADDING, X_AXIS_PADDING, Y_AXIS_PADDING } from '../metrics.contants';
import { useAxisY, useGrid } from '../metrics.hooks';

export const LineChart = memo(({ values }: LineChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const classes = useStyles({});

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
    }, [values]);

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
                .scaleLinear<number>()
                .domain([0, values.length - 1])
                .range([svgWidth - VIEW_BOX_RIGHT_PADDING, X_AXIS_PADDING]);

            const y = d3
                .scaleLinear()
                .domain([min, max])
                .range([svgHeight - Y_AXIS_PADDING, 0]);

            const svg = d3.select(svgRef.current);

            svg.attr('viewBox', ([0, 0, svgWidth, svgHeight] as unknown) as number);

            svg.append('path')
                .style('fill', 'none')
                .style('stroke', 'steelblue')
                .attr('stroke-width', '3px')
                .attr('d', () =>
                    d3
                        .line<number>()
                        .curve(d3.curveLinear)
                        .x((_, index) => x(index))
                        .y((value) => y(value))(values)
                );

            const pointGroup = svg
                .append('g')
                .selectAll('g')
                .data(values)
                .join('g')
                .attr('class', classes.point)
                .attr('transform', (value, index) => `translate(${x(index)}, ${y(value)})`);

            pointGroup.append('circle').attr('r', '10').attr('cx', 0).attr('cy', 0);

            pointGroup
                .append('text')
                .attr('class', classes.text)
                .text((value) => value);
        }
    }, [svgRef, values, classes]);

    return <svg className={classes.root} ref={svgRef} />;
});
